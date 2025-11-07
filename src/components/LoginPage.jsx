import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
  const navigate = useNavigate();

    const handleLogin = () => {
        if (!id || !name) {
            alert("Please enter both ID and Name!");
            return;
        }

        localStorage.setItem("userId", id);
        localStorage.setItem("userName", name);
        localStorage.setItem("isLoggedIn", "true");

        setId('');
        setName('');
        
        navigate("/dashboard");
        window.location.reload();
    }

    return (
        <section id="loginpage" className="relative min-h-[100vh] flex items-center">
            <div className="container mx-auto">
                <div className="flex items-center justify-center w-full">
                    <div className="w-full p-4 bg-white shadow-lg rounded-lg max-w-[280px]">
                        <header className="text-xl mb-4 text-[#537178]">Login</header>
                        <input 
                            type="text" 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-[244px] h-[40px] p-4 rounded-lg bg-[#EEF1F8] mb-4 text-sm focus:outline-none" 
                            placeholder="Id" 
                        />
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-[244px] h-[40px] p-4 rounded-lg bg-[#EEF1F8] mb-4 text-sm focus:outline-none" 
                            placeholder="Name" 
                        />
                        <button
                            onClick={ handleLogin }
                            className="w-[244px] h-[40px] rounded-lg bg-[#5285ec] text-white flex items-center justify-center hover:cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}