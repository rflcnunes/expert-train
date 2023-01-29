import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockUser = {
  name: 'Test User',
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'testpassword',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      name: 'Test User 01',
      username: 'testuser01',
      email: 'testuser01@example.com',
      password: 'testpassworduser01',
    },
    {
      name: 'Test User 02',
      username: 'testuser02',
      email: 'testuser02@example.com',
      password: 'testpassworduser02',
    },
    {
      name: 'Test User 03',
      username: 'testuser03',
      email: 'testuser03@example.com',
      password: 'testpassworduser03',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);

    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });
});
