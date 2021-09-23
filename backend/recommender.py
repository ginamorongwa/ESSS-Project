import sqlite3
import random
import pandas as pd
import numpy as np

def recommend(databaseName):
    conn = sqlite3.connect(databaseName)
    cur = conn.cursor()
    #print(cur.execute("SELECT name FROM my_db.sqlite_master WHERE type='table';"))

    #reading dataframes from database
    ratings_df = pd.read_sql_query("SELECT * from ratings", conn)
    posts_df = pd.read_sql_query("SELECT * from posts", conn)
    userRating_df = pd.read_sql_query("SELECT * from userRating", conn)

    #finding students who rated the same posts
    students_subset = ratings_df[ratings_df['postID'].isin(userRating_df['postID'].tolist())]

    std_subsetGroup = students_subset.groupby(['userID'])
    std_subsetGroup = sorted(std_subsetGroup,  key=lambda x: len(x[1]), reverse=True)
    print(std_subsetGroup[0][1])

    # Finding similar students using pearson correlation
    studentsSubsetGroup = std_subsetGroup[0:100]
    pearsonCorrelationDict = {}
    for name, group in studentsSubsetGroup:

        group = group.sort_values(by='postID')
        userRating_df = userRating_df.sort_values(by='postID')
        nRatings = len(group)
        temp_df = userRating_df[userRating_df['postID'].isin(group['postID'].tolist())]
        tempRatingList = temp_df['rating'].tolist()

        tempGroupList = group['rating'].tolist()

        # Calculate the pearson correlation
        Sxx = sum([i ** 2 for i in tempRatingList]) - pow(sum(tempRatingList), 2) / float(nRatings)
        Syy = sum([i ** 2 for i in tempGroupList]) - pow(sum(tempGroupList), 2) / float(nRatings)
        Sxy = sum(i * j for i, j in zip(tempRatingList, tempGroupList)) - sum(tempRatingList) * sum(
            tempGroupList) / float(
            nRatings)
        if Sxx != 0 and Syy != 0:
            pearsonCorrelationDict[name] = Sxy / np.sqrt(Sxx * Syy)
        else:
            pearsonCorrelationDict[name] = 0


    pearsonCorr_df = pd.DataFrame.from_dict(pearsonCorrelationDict, orient='index')
    pearsonCorr_df.columns = ['similarityIndex']
    pearsonCorr_df['userID'] = pearsonCorr_df.index
    pearsonCorr_df.index = range(len(pearsonCorr_df))
    topStudents = pearsonCorr_df.sort_values(by='similarityIndex', ascending=False)[0:50]
    topStudensRating = topStudents.merge(ratings_df, left_on='userID', right_on='userID', how='inner')


    # Multiplies the similarity by the student's ratings
    topStudensRating['weightedRating'] = topStudensRating['similarityIndex'] * topStudensRating['rating']

    # Applies a sum to the topStudents after grouping up by userId
    tempTopStudentssRating = topStudensRating.groupby('postID').sum()[['similarityIndex', 'weightedRating']]
    tempTopStudentssRating.columns = ['sum_similarityIndex', 'sum_weightedRating']

    # Make recommendations
    recommendation_df = pd.DataFrame()
    
    recommendation_df['weighted average recommendation score'] = tempTopStudentssRating['sum_weightedRating'] / \
                                                             tempTopStudentssRating['sum_similarityIndex']
    recommendation_df['postID'] = tempTopStudentssRating.index
    recommendation_df = recommendation_df.sort_values(by='weighted average recommendation score', ascending=False)
    recommended_postsdf = posts_df.loc[posts_df['id'].isin(recommendation_df.head(20)['postID'].tolist())]
    recommended_postsdf.to_sql('recommendations',conn, if_exists='replace', index=False)
    print("done")
