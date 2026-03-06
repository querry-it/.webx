import { AuthRepository } from './repositories/auth.repository';
import { LocationRepository } from './repositories/location.repository';

async function main() {
  const result = await AuthRepository.isCodeExist('A1234QsXz99c');
  console.log(result);
  const length = await LocationRepository.getHistoryLength(
    '550e8400-e29b-41d4-a716-446655440000',
    '550e8400-e29b-41d4-a716-446655440000',
  );
  console.log(length);
}

main();
