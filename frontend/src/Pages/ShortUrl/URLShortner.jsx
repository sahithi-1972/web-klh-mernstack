import React from 'react'
import { TextInput } from '@mantine/core';
import { Stack, Button } from '@mantine/core';
import Service from '../../utils/http.js';
import { useState, useEffect } from 'react';

export default function URLShortner()   {
    const service = new Service();
    const [data, setData] = useState({});
    const [shortUrl, setShortUrl] = useState(" ");
    const handleSubmit = async () => {
       try {
            const res = await service.post("s", data);
            setShortUrl("https://localhost:5173/api/s"+res.shortCode);
            console.log(res);
       } catch (error) {
           console.error("POST API call failed!", error.message);
       }
   };
   const onChange = (event) => {
        setData({
            ...data, originalUrl: event.target.value
        })
   };
   useEffect(() => {
       console.log(`Short URL is ${shortUrl}`);
   }, [shortUrl])

   return (
    <>
    {shortUrl ? <p> {shortUrl}</p>:  
    <Stack>
    <TextInput
      size="md"
      label="Original URL"
      withAsterisk
      placeholder="Input placeholder"
      onChange={onChange}
    /> 
    <TextInput
      size="md"
      label="Customize your link"
      placeholder="Customize your link"
      onChange={onChange}
    />
     <TextInput
      size="md"
      label="Title"
      placeholder="Title of URL"
      onChange={onChange}  
    />

    <Button variant="outline" color="indigo" onClick={handleSubmit} onChange ={onChange}>
      Submit
    </Button>
   
    </Stack>
}
  </>
   )

}


