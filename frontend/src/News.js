import React from "react";
import Typography from '@material-ui/core/Typography';

// https://feed.mikle.com/my/widget/edit/142514/?type=RSS
// import Typography from '@material-ui/core/Typography';
const News = () => {

  return (
    <>
    <Typography variant="h4" component="h4" style={{marginBottom: '20px'}}>
        News
      </Typography>
    <div>
    <iframe src="https://feed.mikle.com/widget/v2/142514/?preloader-text=Loading..." height="369px" width="600px" class="fw-iframe" scrolling="no" frameborder="0" title='starslatecodex'></iframe>
{/* 
  <rssapp-wall id="uf3NOGsGUYQg0BR1"></rssapp-wall><script src="https://widget.rss.app/v1/wall.js" type="text/javascript" async></script> */}
    </div>
    </>
  );
};

export default News;
