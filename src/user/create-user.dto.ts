import { IsString, IsNotEmpty, Length } from 'class-validator';

// 创建完对应的 DTO 后，我们
export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 24, {
    message({ property, value, constraints }) {
      return `${property}的长度应该在${constraints[0]}-${constraints[1]}之间`;
    },
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64, {
    message({ property, value, constraints }) {
      return `${property}的长度应该在${constraints[0]}-${constraints[1]}之间`;
    },
  })
  password: string;
}

export class updateUserDto {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  @Length(4, 24, {
    message({ property, value, constraints }) {
      return `${property}的长度应该在${constraints[0]}-${constraints[1]}之间`;
    },
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64, {
    message({ property, value, constraints }) {
      return `${property}的长度应该在${constraints[0]}-${constraints[1]}之间`;
    },
  })
  password: string;
}
