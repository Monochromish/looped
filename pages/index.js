import Head from 'next/head'
import Image from 'next/image'
import LoginModal from '../components/LoginModal'
import Layout from "../components/layout";
import { Container, Grid, Spacer, Card, Text } from "@nextui-org/react";
import { Suspense } from 'react';
import NavBar from "../components/navbar";
import GPA from "../components/cards/GPA";
import AssignmentCard from "../components/cards/assignments";
import NewsCard from "../components/cards/news";
import GradesCard from "../components/cards/grades";

export default function Home() {
  return (
    <>
      <Head>
        <title>Looped</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='dashboardContainer'>
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', gap: 20, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <GPA />
          <GradesCard />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', gap: 20, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <AssignmentCard />
          <NewsCard />
        </div>
      </div>
    </>
  )
}
