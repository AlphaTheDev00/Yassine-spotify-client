import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <Box
      w="100%"
      maxW="400px"
      mx="auto"
      mt="50px"
      p={4}
      bg="gray.800"
      color="white"
      borderRadius="lg"
    >
      <Heading size="lg" mb={6} textAlign="center">
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              color="white"
              borderRadius="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              color="white"
              borderRadius="md"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" w="100%">
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
