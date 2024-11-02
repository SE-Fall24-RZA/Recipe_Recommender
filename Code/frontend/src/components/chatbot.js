"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiUser, FiCpu } from "react-icons/fi";
import {
  Box,
  Button,
  Input,
  Flex,
  VStack,
  Text,
  useToast,
  Icon,
} from "@chakra-ui/react";

import chat_route from "../apis/chat_route";

// Default chat options for quick start
const defaultOptions = [
  "Give me ideas for a tasty Indian meal",
  "How to make grilled cheese sandwich?",
  "Give me a meal plan which is high in protein",
];

// Markdown component to render formatted text
const Markdown = ({ content }) => {
  const processedContent = content
    .replace(/\\n/g, "\n")
    .replace(/\\\*/g, "*")
    .replace(/\\"/g, '"')
    .replace(/##""##/g, "")
    .replace(/""\s*([^:]+):\*\*/g, '**"$1:"**')
    .replace(/""([^"]+)""/g, '"$1"')
    .replace(/(\w+:)"/g, '$1"')
    .replace(/\*\*"([^"]+)"\*\*/g, '**"$1"**')
    .replace(/([.!?])\s+/g, "$1\n");

  return (
    <ReactMarkdown
      className='prose mt-1 w-full break-words prose-p:leading-relaxed py-3 px-3 mark-down'
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a {...props} style={{ color: "#27afcf", fontWeight: "bold" }} />
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag='div'
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        p: ({ children }) => <Text whiteSpace='pre-line'>{children}</Text>,
        strong: ({ children }) => (
          <Text as='strong' fontWeight='bold'>
            {children}
          </Text>
        ),
        blockquote: ({ children }) => (
          <Box
            borderLeftWidth='4px'
            borderColor='gray.500'
            pl={4}
            py={2}
            my={2}
            fontStyle='italic'
            bg='gray.200'
            borderRadius='md'
          >
            {children}
          </Box>
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

// Main ChatStream component
const ChatStream = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const chatContainerRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await startChat(question);
  };

  const startChat = async (initialQuestion) => {
    setChatStarted(true);
    setQuestion("");
    setMessages((prev) => [
      ...prev,
      { type: "user", content: initialQuestion },
      { type: "ai", content: "" },
    ]);

    try {
      const req = { json: async () => ({ question: initialQuestion }) };
      const response = await chat_route(req);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const { text, isLast } = JSON.parse(chunk);

        accumulatedContent += text;

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.type === "ai") {
            lastMessage.content = accumulatedContent;
          }
          return newMessages;
        });

        if (isLast) break;
      }
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: "An error occurred while processing your request.",
        },
      ]);
      toast({
        title: "Error.",
        description: "An error occurred while processing your request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction='column'
      align='center'
      minHeight='100vh'
      bg='white'
      color='gray.800'
    >
      <Box
        w={{ base: "95%", md: "80%", lg: "50%" }}
        height='100%'
        display='flex'
        flexDirection='column'
        borderWidth='1px'
        borderColor='gray.300'
        borderRadius='md'
      >
        <Box
          ref={chatContainerRef}
          flex='1'
          p={6}
          overflowY='auto'
          className='custom-scrollbar'
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Flex
                  justify={message.type === "user" ? "flex-end" : "flex-start"}
                >
                  <Box
                    maxW='80%'
                    borderRadius='lg'
                    boxShadow='md'
                    bg={message.type === "user" ? "green.500" : "gray.100"}
                    p={4}
                    m={1}
                    color={message.type === "user" ? "white" : "gray.800"}
                  >
                    <Flex align='center'>
                      <Icon
                        as={message.type === "user" ? FiUser : FiCpu}
                        mr={2}
                      />
                      {message.type === "user" ? (
                        <Text fontSize='sm'>{message.content}</Text>
                      ) : (
                        <Markdown content={message.content} />
                      )}
                    </Flex>
                  </Box>
                </Flex>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
        <Box p={6} borderTopWidth='1px' borderColor='gray.300'>
          {!chatStarted && (
            <VStack spacing={4} mb={6}>
              {defaultOptions.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => startChat(option)}
                  colorScheme='green'
                  variant='outline'
                  width='full'
                  _hover={{ bg: "green.600", color: "white" }}
                >
                  {option}
                </Button>
              ))}
            </VStack>
          )}
          <form onSubmit={handleSubmit}>
            <Flex>
              <Input
                flex='1'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='Ask a question'
                borderRadius='md'
                bg='gray.100'
                color='gray.800'
                _focus={{ borderColor: "green.500" }}
                _placeholder={{ color: "gray.500" }}
              />
              <Button type='submit' colorScheme='green' ml={2}>
                <FiSend />
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatStream;
