import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import IMG from "./IMG/Wwbsite_img.webp";
 
function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showCartoon, setShowCartoon] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [inChatAlert, setInChatAlert] = useState(null);

  const [timeLeft, setTimeLeft] = useState(120);

  const [freeMessagesLeft, setFreeMessagesLeft] = useState(5);

  function goto_book_video()
  {
    window.location.href="https://satyarishi.ai/"
  }


  useEffect(() => 
  {
    setShowCartoon(true);
    const interval = setInterval(() => 
    {
      setShowCartoon((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen && isLoggedIn && timeLeft > 0 && !showSubscriptionPrompt) 
    {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } 
    else if (timeLeft === 0) 
    {
      setShowSubscriptionPrompt(true);
    }
  }, [isOpen, isLoggedIn, timeLeft, showSubscriptionPrompt]);

  const formatTime = (seconds) => 
  {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetAllLimits = () => 
  {
    setTimeLeft(300);
    setFreeMessagesLeft(5);
    setShowSubscriptionPrompt(false);
    setInChatAlert(null);
  };

  const SubscriptionPrompt = () => (
    <div className="chat-message bot custom-alert">
      <p>
        <strong>Want to know more?</strong>
      </p>
      <p>
        Your free session is over. Please subscribe to continue the
        conversation!
      </p>
      <div className="alert-actions">
        <button className="confirm-btn" onClick={() => {
            setInChatAlert({
              type: "success",
              message: "Subscribed! Thank you for subscribing.",
            });
            setShowSubscriptionPrompt(false);
            resetAllLimits();
          }}
        >
          Get Subscription Now
        </button>
        <button onClick={goto_book_video}>Book Video Session</button>
        <button onClick={goto_book_video}>Book Audio Session</button>
        <button onClick={goto_book_video}>Book Chat Session</button>

        <button
          className="cancel-btn"
          onClick={() => setShowSubscriptionPrompt(false)}
        >
          Maybe Later
        </button>
      </div>
    </div>
  );

  const handleSend = () => {
    if (!input.trim()) return;

      const isLimitReached =
      showSubscriptionPrompt || timeLeft === 0 || freeMessagesLeft <= 0;

    if (isLimitReached) 
      {
       if (!showSubscriptionPrompt) 
      {
        setShowSubscriptionPrompt(true);
      }
      return;
    }

    setInChatAlert(null);
    setShowSubscriptionPrompt(false);

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setIsBotTyping(true);

    setFreeMessagesLeft((prevCount) => prevCount - 1);

    setTimeout(() => 
    {
      let botResponseText;

      if (!isFirstMessageSent) 
      {
        botResponseText = (
          <>
            Thanks, {username}. Please enter your details for an astrological
            reading:
            <ul>
              <li>**Full Name:**</li>
              <li>**Date Of Birth:**</li>
              <li>**Time Of Birth:**</li>
              <li>**Birth Location:**</li>
            </ul>
          </>
        );

        setIsFirstMessageSent(true);

        const botMessage = 
        {
          sender: "bot",
          text: botResponseText,
        };

        setIsBotTyping(false);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
     else
      {
        setIsBotTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "Thank you for the details. Analyzing your chart...",
          },
        ]);
      }

      if (freeMessagesLeft - 1 <= 0) 
      {
        setShowSubscriptionPrompt(true);
      }
    }, 2000);
  };

  const openChat = () => 
  {
    if (!isLoggedIn) 
    {
      setIsOpen(true);
      setShowLoginPopup(true);
      setShowCartoon(false);
      return;
    }
    setIsOpen(true);
    setShowCartoon(false);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = () => 
  {
    setInChatAlert(null);

    if (!username || !email || !password) 
    {
      setInChatAlert({ type: "error", message: "Please Fill All Fields" });
      return;
    }
    setInChatAlert({ type: "success", message: "Login Successful!" });

    setTimeout(() => 
    {
      setIsLoggedIn(true);
      setShowLoginPopup(false);
      setInChatAlert(null);
      resetAllLimits();
      setMessages([
        {
          sender: "bot",
          text: `Welcome ${username}! How can I help you today? (You have 5 free messages and 5 minutes)`,
        },
      ]);
      setIsFirstMessageSent(false);
    }, 1500);
  };

  // ---------------- SIGNUP ----------------
  const handleSignup = () => 
  {
    setInChatAlert(null);
   if (!username || !email || !password) 
    {
      setInChatAlert({ type: "error", message: "Please Fill All Fields" });
      return;
    }

    setInChatAlert({
      type: "success",
      message: "Signup Successful! You can login now.",
    });

    setTimeout(() => 
    {
      setUsername("");
      setEmail("");
      setPassword("");
    }, 1500);
  };

  function deal_now_fn() 
  {
    var prompt_value = prompt("ENTER YOUR CONTACT NUMBER");
    if (prompt_value && prompt_value.length > 0) 
    {
      alert("TECH DILIGENTS TEAM WILL CONTACT YOU SOON...");
    } 
    else 
    {
      alert("PLEASE ENTER YOUR CONTACT NUMBER");
    }
  }
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">Tech Diligents</h2>
        <ul className="nav-links">
          <li>Home</li>
          <li>Products</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* BANNER */}
      <header className="hero">
        <h1>Welcome to Tech Diligents</h1>
        <p>Best deals on website Development, Design & more</p>
        <button className="shop-btn" onClick={deal_now_fn}>
          Contact Now
        </button>
      </header>

      {/* PRODUCTS */}
      <section className="products-section">
        <h2>Featured Projects</h2>

        <div className="product-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-card">
              <div className="product-img">
                <img src={IMG} width="250px" height="150px" alt={`Project ${item}`}/>
              </div>
              <h3>Project {item}</h3>
              <p>$49.99</p>
              <button className="add-btn">Deal With This</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Tech Diligents. All rights reserved.</p>
      </footer>

      {!isOpen && (
        <div className="chat-button-container">
          {showCartoon && (
            <div className="cartoon-bubble">
              <img
                src="https://st2.depositphotos.com/1763191/9870/v/950/depositphotos_98701414-stock-illustration-boy-with-paper-asking-questions.jpg"
                width={"80px"}
                height={"100px"}
                alt="Cartoon asking question"
              ></img>
            </div>
          )}

          <button className="chat-btn" onClick={openChat}>
            💬 Ask a Question
          </button>
        </div>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              className="profile-icon"
              alt="Profile"
            />
            <span> Welcome To Astrology</span>

            {isLoggedIn && !showLoginPopup && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: "10px",
                  fontSize: "12px",
                  lineHeight: "1.2",
                }}
              >
                <span
                  style={{
                    color: timeLeft < 11 ? "red" : "white",
                    fontWeight: "bold",
                  }}
                >
                  Time Left: {formatTime(timeLeft)}
                </span>
                <span
                  style={{
                    color: freeMessagesLeft <= 1 ? "red" : "white",
                    fontWeight: "bold",
                  }}
                >
                  Messages Left: {freeMessagesLeft}
                </span>
              </div>
            )}

            {/* NEW CHAT BUTTON */}
<button
  className="new-chat-btn"
  onClick={() => {
    setMessages([
      {
        sender: "bot",
        text: `Welcome ${username}! How can I help you today?${
          freeMessagesLeft > 0 && timeLeft > 0
            ? " (You have 5 free messages and 5 minutes)"
            : ""
        }`,
      },
    ]);
    setIsFirstMessageSent(false);
    setShowSubscriptionPrompt(false);
    setInChatAlert(null);
    setInput("");

 
  }}
>
  🔄
</button>
            <button
              className="close-btn"
              onClick={() => {
                setIsOpen(false);
                setShowLoginPopup(false);
                setInChatAlert(null);
              }}
            >
              ✖
            </button>
          </div>

          {showLoginPopup && (
            <div className="login-popup-inner">
              <div className="popup-box-inner">
                <h2>Login / Signup</h2>

                {inChatAlert && (
                  <div className={`form-alert ${inChatAlert.type}`}>
                    {inChatAlert.message}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/[^A-Za-z ]/g, ""))
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value.replace(/[^a-z0-9@._%+-]/g, ""))
                  }
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-btn" onClick={handleLogin}>
                  Login
                </button>
                <button className="signup-btn" onClick={handleSignup}>
                  Signup
                </button>
                <button
                  className="close-popup-inner"
                  onClick={() => {
                    setShowLoginPopup(false);
                    setIsOpen(false);
                    setInChatAlert(null);
                  }}
                >
                  ✖
                </button>
              </div>
            </div>
          )}
          {!showLoginPopup && isLoggedIn && (
            <>
              <div className="chat-body">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${msg.sender === "user" ? "user" : "bot"
                      }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isBotTyping && (
                  <div className="chat-message bot typing-indicator">
                    Typing....
                  </div>
                )}

                {showSubscriptionPrompt && <SubscriptionPrompt />}

                {inChatAlert && inChatAlert.type === "success" && (
                  <div className="chat-message bot custom-alert success">
                    {inChatAlert.message}
                  </div>
                )}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)} placeholder={
                    freeMessagesLeft > 0 && timeLeft > 0
                      ? "Ask Your Question "
                      : "Limit reached. Subscribe to continue..."
                  }
                  disabled={
                    isBotTyping ||
                    showSubscriptionPrompt ||
                    timeLeft === 0 ||
                    freeMessagesLeft <= 0
                  }/>
                <button onClick={handleSend} disabled={
                    isBotTyping ||
                    showSubscriptionPrompt ||
                    timeLeft === 0 ||
                    freeMessagesLeft <= 0
                  }>Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
export default ChatBox;