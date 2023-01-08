import Head from 'next/head'
import {hasCookie} from "cookies-next";
import useSWR from "swr";
import {fetcher} from "../libs/sl";
import Load from "../components/util/Loading";
import {Card, Text} from "@nextui-org/react";
import Link from "next/link";
import No from "../components/util/no";

export default function News() {

    if (!hasCookie('sl-token') || !hasCookie('sl-uid')) {
        return null;
    }


    const {data, error} = useSWR('/api/_sl/news', fetcher)


    let newsElement = <Load />
    if (error) newsElement = <Text>Failed to load</Text>
    if (data) {
        if (data.length > 0) {
            newsElement = data.map((news, index) => {
                //if (index >= 5) return null;
                // TODO: Add date on card
                return (
                    <Link href={`/news/${news.iD}`}>
                        <Card
                            isPressable
                            isHoverable
                            key={news.iD}
                            variant="flat"
                            css={{padding: "1rem", marginBottom: "1rem", cursor: "pointer"}}
                        >
                            <Card.Body>
                                <Text>{news.title}</Text>
                            </Card.Body>
                        </Card>
                    </Link>
                )
            })
        } else {
            newsElement = <No thing={"News"} />
        }

    }

    return (
        <>
            <Head>
                <title>News - Looped</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>News</h1>
            {newsElement}

        </>
    )
}
