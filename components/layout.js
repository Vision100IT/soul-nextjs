/** @jsx jsx */
import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ThemeProvider, Styled, jsx} from 'theme-ui';
import styled from '@emotion/styled';
import {MdEmail as Email, MdMap as Map} from 'react-icons/md';
import {FaPodcast as Podcast, FaCalendarAlt as Calendar} from 'react-icons/fa';
import PropTypes from 'prop-types';
import theme from '../lib/theme';
import urlFor from '../utils/sanity-img';
import CompButton from './comp-button';
import Footer from './footer';
import Navigation from './navigation';
import '../style.css';

const CoverImage = styled('div')`
  background-image: url(${props =>
    props.img.asset.metadata ? props.img.asset.metadata.lqip : ''});
  background-size: cover;
  width: 100%;
  height: 250px;
  overflow: hidden;
  margin-top: 40px;
`;

const InnerImg = styled('img')`
  object-fit: cover;
  width: 100%;
  height: 100%;
  object-position: 0 0;
`;

const Flex = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  background-color: ${props => props.background};
  padding: 0 10vw;
`;

const icons = {
  email: <Email />,
  podcast: <Podcast />,
  calendar: <Calendar />,
  map: <Map />
};

export default function Layout({menuData, children, mainData}) {
  const router = useRouter();
  console.log(router);
  const {slug} = router.query;
  const {mainImage, cta, title, seo} = mainData;
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Head>
          <title>{title} | Soul Church</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:type" content="website" />
          {seo && seo.title && (
            <meta
              name="og:title"
              property="og:title"
              content={seo.title || title}
            />
          )}
          {seo && seo.metaDescription && (
            <meta
              name="og:description"
              property="og:description"
              content={seo.metaDescription}
            />
          )}
          <meta property="og:site_name" content="Soul Church" />
          <meta property="og:locale" content="en_AU" />
          <meta
            property="og:url"
            content={`https://soulchurch.org.au${router.asPath}`}
          />
          {seo && seo.socialImage ? (
            <meta
              property="og:image"
              content={urlFor(seo.socialImage)
                .format('jpg')
                .url()}
            />
          ) : (
            <meta
              property="og:image"
              content={urlFor(mainImage)
                .format('jpg')
                .url()}
            />
          )}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3C5A72" />
          <link rel="canonical" href="https://soulchurch.org.au" />
        </Head>
        <Navigation menuData={menuData} />
        {slug !== 'null' ? (
          <React.Fragment>
            <CoverImage img={mainImage}>
              <picture>
                <source
                  srcSet={urlFor(mainImage)
                    .height(250)
                    .width(1400)
                    .format('webp')
                    .fit('max')
                    .url()}
                  type="image/webp"
                />
                <InnerImg
                  src={urlFor(mainImage)
                    .height(250)
                    .width(1400)
                    .format('jpg')
                    .fit('max')
                    .url()}
                />
              </picture>
            </CoverImage>
            <Flex sx={{backgroundColor: 'banner'}}>
              <Styled.h1 sx={{fontWeight: 'body', margin: '0'}}>
                {title}
              </Styled.h1>
              {cta && (
                <div>
                  <CompButton
                    icon={icons[cta.icon]}
                    text={cta.text}
                    color="banner"
                    size={1.5}
                  />
                </div>
              )}
            </Flex>
          </React.Fragment>
        ) : (
          ''
        )}
        ;{children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

function HomeLayout({menuData, children, mainData}) {
  const {title, metaDescription, socialImage} = mainData.seo;
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Head>
          <title>{title} | Soul Church</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta name="og:title" property="og:title" content={title} />
          <meta
            name="og:description"
            property="og:description"
            content={metaDescription}
          />
          <meta property="og:site_name" content="Soul Church" />
          <meta property="og:locale" content="en_AU" />
          <meta property="og:url" content="https://soulchurch.org.au/" />
          <meta
            property="og:image"
            content={urlFor(socialImage)
              .height(250)
              .width(1400)
              .format('jpg')
              .fit('max')
              .url()}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3C5A72" />
          <link rel="canonical" href="https://soulchurch.org.au" />
        </Head>
        <Navigation menuData={menuData} />
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.element.isRequired,
  menuData: PropTypes.object.isRequired
};

export {HomeLayout};
