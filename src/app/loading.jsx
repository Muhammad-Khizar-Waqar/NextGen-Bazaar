import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="text-xl">Loading desert treasures...</div>
    </motion.div>
  );
}