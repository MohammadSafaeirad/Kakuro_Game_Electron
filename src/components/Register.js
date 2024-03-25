// import React, { useState } from 'react';

// // const Register = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [message, setMessage] = useState('');
  
// //     // const handleSubmit = async (e) => {
// //     //   e.preventDefault();
// //     //   try {
// //     //     const response = await fetch('http://localhost:3001/register', {
// //     //       method: 'POST',
// //     //       headers: { 'Content-Type': 'application/json' },
// //     //       body: JSON.stringify({ email, password }),
// //     //     });
// //     //     const data = await response.json();
// //     //     if (response.ok) {
// //     //       console.log('Registration successful', data);
// //     //       setMessage('Registration successful!');
// //     //       // Reset form or further actions
// //     //       setEmail('');
// //     //       setPassword('');
// //     //     } else {
// //     //       console.error('Registration failed:', data.message);
// //     //       setMessage(data.message || 'Failed to register');
// //     //     }
// //     //   } catch (error) {
// //     //     console.error('Registration error:', error);
// //     //     setMessage('Failed to register');
// //     //   }
// //     // };
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //           const response = await fetch('http://localhost:3001/register', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ email, password }),
// //           });
      
// //           if (response.ok) {
// //             const data = await response.json(); // Parse JSON data only if response is OK
// //             console.log('Registration successful', data);
// //             setMessage(data.message || 'Registration successful!'); // Display success message from server or a default one
// //             // Reset form or further actions
// //             setEmail('');
// //             setPassword('');
// //           } else {
// //             const errorData = await response.json(); // Parse JSON data for error message
// //             console.error('Registration failed:', errorData.message);
// //             setMessage(errorData.message || 'Failed to register'); // Display error message from server or a default one
// //           }
// //         } catch (error) {
// //           console.error('Registration error:', error);
// //           setMessage('Failed to register due to a network error');
// //         }
// //       };
      
  
// //     return (
// //       <div>
// //         <h2>Register</h2>
// //         <form onSubmit={handleSubmit}>
// //           <label>Email:</label>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //           <label>Password:</label>
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           <button type="submit">Register</button>
// //         </form>
// //         {message && <p>{message}</p>}
// //       </div>
// //     );
// //   };
  
// // export default Register;
// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     // const handleSubmit = async (e) => {
//     //   e.preventDefault();
//     //   try {
//     //     const response = await fetch('http://localhost:3001/register', {
//     //       method: 'POST',
//     //       headers: { 'Content-Type': 'application/json' },
//     //       body: JSON.stringify({ email, password }),
//     //     });
      
//     //     if (response.ok) {
//     //       const data = await response.json(); // Parse JSON data only if response is OK
//     //       console.log('Registration successful', data);
//     //       setMessage(data.message || 'Registration successful!'); // Display success message from server or a default one
//     //       // Reset form or further actions
//     //       setEmail('');
//     //       setPassword('');
//     //     } else {
//     //       const errorData = await response.json(); // Parse JSON data for error message
//     //       console.error('Registration failed:', errorData.message);
//     //       setMessage(errorData.message || 'Failed to register'); // Display error message from server or a default one
//     //     }
//     //   } catch (error) {
//     //     console.error('Registration error:', error);
//     //     setMessage(`Failed to register due to an error: ${error.message}`);
//     //   }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         try {
//             const response = await fetch('http://localhost:3001/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });
    
//             // Try to parse JSON response (useful for both successful and error responses if they're JSON)
//             let data;
//             try {
//                 data = await response.json(); // This might fail if response is not JSON
//             } catch (parseError) {
//                 // Handle non-JSON response
//                 throw new Error('Received non-JSON response from the server');
//             }
    
//             if (response.ok) {
//                 console.log('Registration successful', data);
//                 setMessage(data.message || 'Registration successful!');
//                 setEmail('');
//                 setPassword('');
//             } else {
//                 // Server responded with an error status code
//                 console.error('Registration failed:', data.message);
//                 setMessage(data.message || 'Failed to register');
//             }
//         } catch (error) {
//             // Network error or receiving non-JSON response
//             console.error('Registration error:', error);
//             setMessage(`Failed to register due to an error: ${error.message}`);
//         }
//     };    
      
//     return (
//       <div>
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Register</button>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     );
// };

// export default Register;
import './Register.css';
import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
    
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            let data;
            try {
                data = await response.json(); // Attempt to parse JSON
            } catch (error) {
                // If JSON parsing fails, throw to catch block
                throw new Error('Failed to parse response as JSON');
            }
    
            if (response.ok) {
                console.log('Registration successful', data);
                setMessage(data.message || 'Registration successful!');
                setEmail('');
                setPassword('');
            } else {
                console.error('Registration failed:', data.message);
                setMessage(data.message || 'Failed to register');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage(`Failed to register due to an error: ${error.toString()}`);
        }
    };    

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="register-input"
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="register-input"
                />
                <button type="submit" className="register-button">Register</button>
            </form>
            {message && <p className="register-message">{message}</p>}
        </div>
    );
};


export default Register;
