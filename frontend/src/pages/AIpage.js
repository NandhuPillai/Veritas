import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.js"
import '../App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {
    Stack,
    Input,
    Container,
    FormControl,
    FormLabel,
    Image,
} from '@chakra-ui/react';
function AIpage() {

    const [url, setUrl] = useState("");
    const [image, setImage] = useState("https://www.science.org/do/10.1126/science.abj5865/abs/Repetition_1280x720.jpg");
    const [output, setOutput] = useState("");

    async function fetchEvents() {
        const data = await axios.get('http://127.0.0.1:5000/ai');
        //const { events } = data.data;
        //setEventsList(events);
        setOutput(data.data);
        console.log("DATA: ", data.data);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(url);
        try {
            const data = await axios.post('http://127.0.0.1:5000/ai', { url });
            console.log(data);
            if (data.data.body.prediction > 0.7) {
                setOutput("This article has been predicted by the AI model to be true. This article has a high probability of being accurate information");
                setImage("https://images.assetsdelivery.com/compings_v2/bankrx/bankrx1804/bankrx180400195.jpg");
            }
            else if (data.data.body.prediction < 0.7 && data.data.body.prediction > 0.5) {
                setOutput("This article has been predicted by the AI model to be mostly true. This article has a medium to high probability of being accurate information");
                setImage("https://images.assetsdelivery.com/compings_v2/bankrx/bankrx1804/bankrx180400195.jpg");
            }
            else {
                setOutput("This article has been predicted by the AI model to be false. This article has a high probability of being false information");
                setImage("https://media.istockphoto.com/id/1314785009/vector/fake-stamp-imprint-seal-template-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=bJrZ1hF0r7Gg0k6-XPt0lRpG88uvERaJ4t7S_6RO5Lw=");
            }

            setUrl("");
        } catch (err) {
            console.log(err.message)
        }

    }

    function handleChange(event) {
        setUrl(event.target.value);
        console.log(url);
    }

    useEffect(() => {
        fetchEvents();
    }, [])

    return (
        <ChakraProvider>
            <div>
                <Navbar />
                <section className="every-section">
                    <Stack spacing={3}>
                        <Image className='center' src={image} alt='Prediction' />
                        <Container maxW='1000px' className="ai-output">
                            {output}
                        </Container>
                        <FormControl>
                            <FormLabel>
                                Enter here:
                            </FormLabel>
                            <form onSubmit={handleSubmit}>
                                <Input placeholder="Enter The Article's URL" size='lg' value={url} onChange={handleChange} />
                            </form>
                        </FormControl>
                    </Stack>

                </section>
            </div>
        </ChakraProvider>
    )
}

export default AIpage