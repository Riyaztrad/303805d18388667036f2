import React, { useState } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    FlatList,
    Linking,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { getRandomAsteroid } from '../../backEnd/services'
const Home = (props) => {

    const [asteroid_id, setAsteroidID] = useState('')
    const [asteroid_list, setAsteroidList] = useState([])
    const [isloading, setLoading] = useState(false)

    const getAsteroidById = async () => {

        props.navigation.navigate('AsteroidInfo', { asteroid_id })

    }


    const getRandomAsteroids = async () => {
        setLoading(true)
        var respose = await getRandomAsteroid()
        console.log("getAsteroidById", respose)
        setAsteroidList(respose.near_earth_objects)
        setLoading(false)
    }

    return (
        <View style={styles.root}>
            <View style={styles.formContainer}>
                <View style={styles.header}>
                    <Text>NASA ASTERIOD</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter Asteroid ID"
                        value={asteroid_id}
                        onChangeText={(text) => setAsteroidID(text)}
                        style={styles.input}
                    />
                </View>
                {
                    isloading &&
                    <ActivityIndicator color="'#037bfc'" size="small" />
                }
                <View style={styles.buttonContainer}>
                    <Button title="submit"
                        disabled={asteroid_id ? false : true}
                        onPress={getAsteroidById}
                    />

                    <Button title="Random Asteroid"
                        onPress={getRandomAsteroids}

                    />
                </View>

            </View>
            <View style={styles.asteroidsContainer}>
                {
                    asteroid_list &&
                    <FlatList
                        c
                        data={asteroid_list}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {

                            return (

                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate('AsteroidInfo', { asteroid_id: item.id })
                                    }}
                                    style={styles.asteroidItem}>
                                    <Text>#{item.id}</Text>
                                    <Text>{item.name_limited}</Text>

                                    <TouchableOpacity style={styles.link} onPress={async () => {
                                        await Linking.openURL(item.links.self);
                                    }} >
                                        <Text style={{ color: '#037bfc' }}>Click Here</Text>
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            )
                        }}
                    />
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },
    formContainer: {
        flex: 0.3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    asteroidsContainer: {
        flex: 0.7,
        width: '100%',
        paddingHorizontal: 15,

    },
    header: {
        margin: 10,
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 15,
    },
    input: {

        borderWidth: 0.5,
        borderColor: '#000',
        margin: 10,
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
        justifyContent: 'space-between'

    },
    asteroidItem: {
        height: 80,
        backgroundColor: '#ccc',
        width: '100%',
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,

    },
    link: {
        position: 'absolute',
        bottom: 10,
        left: 5

    }


})
export default Home;