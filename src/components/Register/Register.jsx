import {
  Box,
  Heading,
  Stack,
} from "@chakra-ui/react";

import { useState } from "react"

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    isArtist: false
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Box w="100%" maxW="400px" mx="auto" mt="50px" p={4} bg="gray.800" color="white" borderRadius="lg">
      <Heading size="lg" mb={6} textAlign="center">
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>

          {/* Email */}
          <div className="input-control">
            <label hidden htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Email address" onChange={handleChange} />
          </div>

          {/* Username */}
          <div className="input-control">
            <label hidden htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
          </div>

          {/* Password */}
          <div className="input-control">
            <label hidden htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
          </div>

          {/* Submit */}
          <div className="input-control">
            <button type="submit">Register</button>
          </div>

        </Stack>
      </form>
    </Box>
  );
};

export default Register;
