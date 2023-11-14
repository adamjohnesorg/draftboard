import React from 'react'
import '../styling/footer.scss'

const Footer = () =>
{
  return (
    <div id = 'footerDiv'>
          <footer id ='footerBar'>
              <div id='leftFooterDiv'>
                <span id='contactInfo'>Business Inquiries or Bug Reports</span>
                <span id='emailInfo'>adam_johnes@outlook.com</span>
              </div>
              <div id='middleFooterDiv'>
                <span id='footerPageTitle'>Fantasy Football Rankings Draftboard</span>
                <span id='copyrightInfo'>&copy; Adam Johnes 2023</span>
              </div>
              <div id='rightFooterDiv'>
                <span id='supportMe'>Support Me</span>
                <a href='https://twitter.com/AdamJohnes_'><span id='myTwitter'>X (Twitter)</span></a>
              </div>
          </footer>
      </div>
  )
}

export default Footer