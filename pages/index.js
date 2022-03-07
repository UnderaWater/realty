import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({ imageUrl, purpose, titleOne, titleTwo, descriptionOne, descriptionTwo, linkName, buttonText }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width='500' height='300' alt='banner' />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium' >
        {purpose}
      </Text>
      <Text fontSize='3xl' fontWeight='bold' >
        {titleOne}<br />{titleTwo}
      </Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' fontWeight='medium' color='gray.700' >
        {descriptionOne}<br />{descriptionTwo}
      </Text>
      <Button fontSize='xl'>
        <Link href={linkName}>
          {buttonText}
        </Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Box>
      <Banner
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
        purpose='RENT A HOME'
        titleOne='Rental Homes for'
        titleTwo='Everyone'
        descriptionOne='Explore Apartmens, Villas, Homes'
        descriptionTwo='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
      />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
        purpose='BUY A HOME'
        titleOne='Find, Buy & Own Your'
        titleTwo='Everyone'
        descriptionOne='Explore Apartmens, Villas, Homes'
        descriptionTwo='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
      />
      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}