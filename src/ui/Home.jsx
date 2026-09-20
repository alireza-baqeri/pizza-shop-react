import CreateUser from '../features/user/CreateUser';
function Home() {
  return (
    <div className="mb-8 mt-10 text-center">
      <h1 className="text-stone-650 mb-4 text-xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-550">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;