import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    ActivityIndicator,
    Linking,
    TouchableOpacity,

} from 'react-native'
import { getAsteroidInfo } from '../../backEnd/services'



const Asteroid = (props) => {
    const { route } = props
    const [asteroidDetails, setAsteroidDetails] = useState(null)
    const [isloading, setLoading] = useState(false)
    useEffect(() => {
        getAsteroid()
    }, [])

    const getAsteroid = async () => {
        let asteroid_id = route.params.asteroid_id
        setLoading(true)
        var respose = await getAsteroidInfo(asteroid_id)
        setAsteroidDetails(respose)
        setLoading(false)
    }
    return (
        <View style={styles.root}>
            {
                isloading ?

                    <ActivityIndicator color="'#037bfc'" size="small" />
                    :
                    <View>
                        {asteroidDetails ?
                            <View style={styles.info}>
                                <Text>Name : {asteroidDetails.name}</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                    <Text style={{ color: '#037bfc' }}>NASA JPL URL : </Text>
                                    <TouchableOpacity onPress={() => {
                                        Linking.openURL(asteroidDetails.nasa_jpl_url)
                                    }}>
                                        <Text style={{ color: '#037bfc' }}>Click Here </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text>is potentially hazardous asteroid: {asteroidDetails.is_potentially_hazardous_asteroid ? 'true' : 'false'}</Text>
                            </View>
                            :
                            <Text>Not Found</Text>
                        }
                        <Button title="Back" onPress={() => {
                            props.navigation.goBack(null)
                        }} />
                    </View>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        padding: 15,
        backgroundColor: '#ccc',
        borderRadius: 15,
        marginBottom: 15,
    }
})
export default Asteroid;