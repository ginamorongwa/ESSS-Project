from flask import Flask, jsonify,request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
import recommender
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:////home/daniel/Pictures/fullstack/virtualenvironment/project_1/backend/Esss_db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Posts(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    serviceName = db.Column(db.String(100))
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    

    def __init__(self, serviceName, title,body):
        self.serviceName = serviceName
        self.title =title
        self.body = body

class PostSchema(ma.Schema):
    class Meta:
        fields = ('id','serviceName' ,'title', 'body', 'date')

post_schema = PostSchema()
posts_schema = PostSchema(many=True)

class Recommendations(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    serviceName = db.Column(db.String(100))
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    

    def __init__(self, serviceName, title,body):
        self.serviceName = serviceName
        self.title =title
        self.body = body

class RecommendationsSchema(ma.Schema):
    class Meta:
        fields = ('id','serviceName' ,'title', 'body', 'date')


recommendation_schema = RecommendationsSchema()
recommendations_schema = RecommendationsSchema(many=True)



@app.route('/get', methods = ['GET'])
def get_posts():
    all_posts = Posts.query.all()
    results = posts_schema.dump(all_posts)
    return jsonify(results)

@app.route('/getRecommended', methods = ['GET'])
def get_recommendedPosts():
    recommender.recommend("Esss_db.db")
    all_recommendations = Recommendations.query.all()
    results = recommendations_schema.dump(all_recommendations)
    return jsonify(results)
    

@app.route('/get/<id>/', methods = ['GET'])
def post_details(id):
    post = Posts.query.get(id)
    return post_schema.jsonify(post)


@app.route('/add', methods = ['POST'])
def add_article():
    serviceName = request.json['serviceName']
    title = request.json['title']
    body = request.json['body']

    post = Posts(serviceName,title,body)
    db.session.add(post)
    db.session.commit()
    return post_schema.jsonify(post)

@app.route('/update/<id>/', methods = ['PUT'])
def update_post(id):
    post = Posts.query.get(id)

    serviceName = request.json['title']
    title = request.json['title']
    body = request.json['body']

    post.serviceName = serviceName
    post.title = title
    post.body = body

    db.session.commit()
    return post_schema.jsonify(post)

@app.route('/delete/<id>/', methods = ['DELETE'])
def post_delete(id):
    post = Posts.query.get(id)
    db.session.delete(post)
    db.session.commit()

    return post_schema.jsonify(post)
    


if __name__== "__main__":
    app.run(host='localhost',port=19000,debug=True)
