import * as bcrypt from 'bcrypt';
export const hashPassword = async (password: string) => {
  if (!password) {
    throw new Error('Password is required for hashing');
  }
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
};
