import React, { useEffect } from 'react'
import Service from '../../utils/http.js';
import { Avatar, Container, Stack, Loader, MantineProvider, Text } from '@mantine/core';


export default function ProfilePage() {
       const service = new Service();
       const [user, setUser] = React.useState(null);
       const [loading, setLoading] = React.useState(true);
       const fetchUser = async () => {
             try {
                 const res = await service.get('user/me');
                 console.log(res);
                 setUser(res);
                 setLoading(false);
             } catch (error) {
                console.error('Error fetching user:', error);
             } finally {      
                setLoading(false);
             }  
       };
        useEffect(
        () => { fetchUser() }, []
        );
       if(loading) {
        return <Loader color="blue" />;
       }
       if(!user) {
        return(
            <div> User not found </div>
        )
       }
    return (
        <Container>
            <Stack    h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar}  size={150} radius={150} alt="it's me"/>
                <Text>Name: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Stack>
        </Container>
  )
}
