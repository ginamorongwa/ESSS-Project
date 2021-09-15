import React from 'react'
import {Text, View} from 'react-native'

import { auth, db } from '../../firebase'

function ProfileScreen() {
    var user = auth.currentUser;

    return (
        <View>
            <Text>Welcome {user.displayName} </Text>
        </View>
    )
}

export default ProfileScreen
