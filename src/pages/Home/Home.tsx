const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <ul>
        <li>- Read articles ...</li>
        <li>- ...</li>
      </ul>
      <img src={process.env.REACT_APP_S3_URL + 'orange.jpeg'} alt="" />
    </>
  );
}

export default Home;