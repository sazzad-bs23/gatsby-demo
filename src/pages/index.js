import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const IndexPage = () => {
  const { t } = useTranslation("translation");

  return (
    <Layout pageTitle={t('Home Page')}>
      <p><Trans>I'm making this by following the Gatsby Tutorial.</Trans></p>
      <h4>{t("welcome_message")}</h4>
      <p><Trans>my_name</Trans></p>
      <p>{t('my_profession')}</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, dozing in a bean bag chair"
        src="../images/clifford.jpg"
      />
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

export default IndexPage
