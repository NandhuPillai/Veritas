import React from 'react'
import Navbar from "../components/Navbar/Navbar.js"
import '../App.css';
import { Center, ChakraProvider, HStack, background } from '@chakra-ui/react';
import {
    Container,
    Heading,
    UnorderedList,
    ListItem,
    VStack,
    Image,

} from '@chakra-ui/react'

function InfoCenter() {
    return (
        <ChakraProvider>
            <div>
                <Navbar />
                <div className="info-div">
                    <Heading className="info-header">
                        Everything You Need to Avoid Misinformation Online.
                    </Heading>
                </div>

                <section className="every-section">
                    <VStack>
                        <Heading size='lg'>
                            Citations, Citation Indicators, and Research Quality:
                        </Heading>
                        <HStack className="info-blocks">
                            <UnorderedList>
                                <ListItem>Citations are often used as performance indicators in research, but may not reflect research quality fully.</ListItem>
                                <ListItem>Bibliometrics has developed around using citations as performance measures.</ListItem>
                                <ListItem>There are many citation indicators like field-normalized citation impact, highly cited papers, and h-index.</ListItem>
                                <ListItem>Field-normalized citation impact attempts to correct for variables affecting citation analysis.</ListItem>
                                <ListItem>The h-index combines productivity and citation impact.</ListItem>
                                <ListItem>There is large variation in citation rates across fields. Indicators need to be normalized by field, year, and document type.</ListItem>
                            </UnorderedList>
                            <Image className='info-images' w="20%" src='https://www.science.org/do/10.1126/science.abj5865/abs/Repetition_1280x720.jpg' alt='Magnifying Glass' />
                        </HStack>

                        <Heading size='lg'>
                            Author Credibility:
                        </Heading>
                        <HStack className="info-blocks">
                            <UnorderedList>
                                <ListItem>Credible sources are written by respected authors who cite sources and present an objective point of view.</ListItem>
                                <ListItem>Consider funding source and audience.</ListItem>
                                <ListItem>Be wary of authors without provided credentials or affiliations to trusted institutions, as expertise may be questionable.</ListItem>
                                <ListItem>Evaluate the author's tone. Restrained, non-sensational language typically reflects scholarly rigor. Highly charged rhetoric may indicate bias.</ListItem>
                                <ListItem>Note disclosures about conflicts of interest, funding sources, or agendas that could introduce bias into the author's work.</ListItem>
                            </UnorderedList>
                            <Image className='info-images' w="20%" src='https://us.123rf.com/450wm/shooarts/shooarts1505/shooarts150500008/40234942-business-flat-vector-background-with-hands.jpg?ver=6' alt='Magnifying Glass' />
                        </HStack>


                        <Heading size='lg'>
                            Date of Publication:
                        </Heading>

                        <HStack className="info-blocks">
                            <UnorderedList>
                                <ListItem>Evaluate online sources for currency, relevance to topic, and authority based on author expertise.</ListItem>
                                <ListItem>Carefully vet internet sources like Wikipedia.</ListItem>
                                <ListItem>Check website domain, author credentials, citation of authoritative sources, publication date, and corroborating sources.</ListItem>
                            </UnorderedList>
                            <Image className='info-images' w="20%" src='https://static.vecteezy.com/system/resources/previews/009/797/518/non_2x/professional-writer-bloggers-journalists-screenwriter-copywriter-author-concept-illustration-set-creative-people-writing-texts-illustration-vector.jpg' alt='Magnifying Glass' />
                        </HStack>


                        <Heading size='lg'>
                            How to Combine Everything and Find Good Sources:
                        </Heading>

                        <HStack className="info-blocks">
                            <UnorderedList>
                                <ListItem>Use sites like Wikipedia to spark research, not as sole sources.</ListItem>
                                <ListItem>Articles/studies with named authors who cite authoritative sources are more reliable than anonymous sources.</ListItem>
                                <ListItem>Examples of unreliable sources: social media, opinion blogs, fake news with no citations, sites mimicking reliable sources.</ListItem>
                            </UnorderedList>
                            <Image className='info-images' w="20%" src='https://media.istockphoto.com/id/959853052/vector/writer-writing-on-computer-paper-sheet-vector-illustration-flat-cartoon-person-editor-write.jpg?s=612x612&w=0&k=20&c=1hCb1J1fXPEmdPzj0GWFwj3B3O4uzf6XQDUGFcPeyvc=' alt='Magnifying Glass' />
                        </HStack>


                    </VStack>
                </section>


            </div>
        </ChakraProvider >

    )
}

export default InfoCenter