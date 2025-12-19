import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import UnderMaintenance from '../components/UnderMaintenance'
import RecentlyViewed from '../components/RecentlyViewed'


const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <BestSeller/>
        <RecentlyViewed/>
        <BottomBanner/>
        <NewsLetter/>
       {/* <UnderMaintenance/> */}
    </div>
  )
}

export default Home