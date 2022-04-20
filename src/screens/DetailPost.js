import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import axios from 'axios';

const PostDetail = ({ route }) => {
  //init Props
  const title = route.params.title;
  const body = route.params.body;
  const id = route.params.id;

  //Init State
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create LifeCycle
  //Function Exception
  useEffect(() => {
    getComment();
  }, []);

  // Create Function to fetch
  const getComment = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    setComments(response.data);
    setIsLoading(false);

    // .then((res) => {
    //   setComments(res.data);
    //   setIsLoading(false);
    // })
    // .catch(() => {
    //   alert('Error Fetch Data');
    //   setIsLoading(false);
    // });
  };

  //   Create Component List
  const _renderItem = ({ item }) => {
    return (
      <ListItem key={item.id.toString()} bottomDivider>
        <ListItem.Content>
          <ListItem.Title numberOfLines={1}>{item.email}</ListItem.Title>
          <ListItem.Subtitle numberOfLines={2}>
            {item.name} - {item.body}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={style.container}>
      <Text h2 style={{ fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text tyle={{ marginTop: 20 }}>{body}</Text>
      <Text tyle={{ marginTop: 20, color: 'grey' }}>Cooments</Text>
      <FlatList
        data={comments}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getComment} />
        }
      />
    </View>
  );
};

export default PostDetail;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    flex: 1,
  },
});
