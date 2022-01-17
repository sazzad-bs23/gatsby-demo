import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const AboutPage = () => {
  const { t } = useTranslation("translation");

  return (
    <Layout pageTitle={t('About Me')}>
      <p><Trans>subtitle_about</Trans></p>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default AboutPage
