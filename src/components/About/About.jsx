const About = () => {
  return (
    <>
      <div className="p-4 bg-gray-800 min-h-screen">
        <h1
          className="text-5xl font-bold text-center"
          style={{ fontFamily: "Chillax" }}
        >
          About Showcase
        </h1>
       
        
        <div className="card mt-5 pb-10 mx-40 pt-5 bg-base-300">
          <div className="card-body items-center" style={{ fontFamily: "Chillax" }}>
            <div className="card bg-base-200 w-1/2 mb-5">
            <h1 className="text-xl text-center">
              Showcase is a platform for small to midsize venues on the same
              circuit to share data about bands they've hosted. This will
              provide access to analytics on ticket sales & alcohol sales volume
              reported on the bands, relative to the venues they’ve already
              visited. This allows venues to tailor their expenditures accordingly. 
            </h1>
            </div>
            <div className="card bg-base-200 w-1/2 items-center mb-5">
                <h1 className="card-title">Coming Soon</h1>
                <ul className="text-center text-lg">
                    <li>Mobile Formatting</li>
                    <li>Search Functionality</li>
                    <li>Ability to filter data over time</li>
                </ul>
            </div>
            <div className="card bg-base-200 w-1/2 items-center">
                <h1 className="card-title">Technologies Used</h1>
                <ul className="text-center text-lg">
                    <li>React</li>
                    <li>Redux/Redux-Sagas</li>
                    <li>TailwindCSS/DaisyUI</li>
                    <li>ChartJS</li>
                    <li>Multer</li>
                    <li>csvtojson</li>
                </ul>
            </div>
            <div className="card bg-base-200 w-1/2 items-center">
            <div className="card-body">
                <img src="/adobe-express-qr-code.png" alt="" />
            </div>
        </div>
            </div>
          
        
       
        </div>
      </div>
    </>
  );
};

export default About;
