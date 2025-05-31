import "../Styles/Header.css"

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <h2><span>F</span>ashion</h2>
      </div>
      <div className="search">
        <input type="search" placeholder="Search..." />
      </div>
      <div className="avatar">
        <img src="https://imgs.search.brave.com/ncoEtzI28X0Yj5dcnNAr-PAGPb84TLMLJkxATklmXyU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waG90/b3NydXNoLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvc2VsZmll/LWN1dGUtc2ltcGxl/LWdpcmwtcGljLWlu/ZGlhbi5qcGc" alt="User Avatar" />
      </div>
    </div>
  );
}

export default Header;
