import { NitroConfig } from 'nitropack'

const redirect: NitroConfig['routeRules'] = {
  // about
  '/who-am-i/**': { redirect: '/about' },
  '/author/siliconvalleykittycatengineer/**': { redirect: '/about' },
  // blog
  '/catalog/**': { redirect: '/blog' },
  // proofpoint-internship
  '/my-internship-story-02/**': { redirect: '/blog/proofpoint-internship/02' },
  '/my-internship-story-01/**': { redirect: '/blog/proofpoint-internship/01' },
  '/my-internship-story-00/**': { redirect: '/blog/proofpoint-internship/00' },
  // k8s-intro
  '/intro-to-k8s-03/**': { redirect: '/blog/k8s-intro/00' },
  '/intro-to-k8s-02/**': { redirect: '/blog/k8s-intro/01' },
  '/intro-to-k8s-01/**': { redirect: '/blog/k8s-intro/02' },
  '/intro-to-k8s/**': { redirect: '/blog/k8s-intro' },
  // us-stuff
  '/us-stuff-02/**': { redirect: '/blog/us-stuff/01' },
  '/us-stuff-01/**': { redirect: '/blog/us-stuff/00' },
  // container-docker
  '/intro-to-container-02/**': { redirect: '/blog/container-docker/02' },
  '/intro-to-container-01/**': { redirect: '/blog/container-docker/01' },
  '/intro-to-container-00/**': { redirect: '/blog/container-docker/00' },
  // next-step-to-personal-growth
  '/next-step-to-personal-growth-04/**': {
    redirect: '/blog/next-step-to-personal-growth/04',
  },
  '/next-step-to-personal-growth-03/**': {
    redirect: '/blog/next-step-to-personal-growth/03',
  },
  '/next-step-to-personal-growth-02/**': {
    redirect: '/blog/next-step-to-personal-growth/02',
  },
  '/next-step-to-personal-growth-01/**': {
    redirect: '/blog/next-step-to-personal-growth/01',
  },
  '/next-step-to-personal-growth-00/**': {
    redirect: '/blog/next-step-to-personal-growth/00',
  },
  // sproutlabs
  '/sproutlabs-07/**': { redirect: '/blog/sproutlabs/07' },
  '/sproutlabs-06/**': { redirect: '/blog/sproutlabs/06' },
  '/sproutlabs-05/**': { redirect: '/blog/sproutlabs/05' },
  '/sproutlabs-04/**': { redirect: '/blog/sproutlabs/04' },
  '/sproutlabs-03/**': { redirect: '/blog/sproutlabs/03' },
  '/sproutlabs-02/**': { redirect: '/blog/sproutlabs/02' },
  '/sproutlabs-01/**': { redirect: '/blog/sproutlabs/01' },
  '/sproutlabs-00/**': { redirect: '/blog/sproutlabs/00' },
  // career
  '/interview-tesla-2020-dec/**': { redirect: '/blog/career/tesla-interview' },
  '/adobe-vs-tesla-vs-proofpoint-new-job/**': {
    redirect: '/blog/career/changing-jobs',
  },
  // tags
  '/tag/sproutlabs/**': { redirect: '/tag?tag=sproutlabs' },
  '/tag/my-internship-story/**': { redirect: '/tag?tag=proofpoint-internship' },
  '/tag/container/**': { redirect: '/tag?tag=container-docker' },
  '/tag/kubernetes/**': { redirect: '/tag?tag=k8s-intro' },
  '/tag/interview/**': { redirect: '/tag?tag=career' },
  '/tag/us-blah/**': { redirect: '/tag?tag=us-stuff' },
  '/tag/next-step-to-personal-growth/**': {
    redirect: '/tag?tag=next-step-to-personal-growth',
  },
}

export default redirect
