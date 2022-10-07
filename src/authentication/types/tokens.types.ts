import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoia2luZ3NsZXkuZXRva2FAaW5ub3ZhdGVzcGFjZS5jbyIsImRldmljZUlkIjotMSwiaWF0IjoxNjYyOTEzNjY4LCJleHAiOjE2NjI5MjQ0Njh9.bNmaklOmTcy5ZuTAJWZoeTFyZ-pCiRg2k9XT8S6tNnzZ',
  })
  access_token: string | null;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoia2luZ3NsZXkuZXRva2FAaW5ub3ZhdGVzcGFjZS5jbyIsImRldmljZUlkIjotMSwiaWF0IjoxNjYyOTEzNjY4LCJleHAiOjE2NjI5MjQ0Njh9.bNmaklOmTcy5ZuTAJWZoeTFyZ-pCiRg2k9XT8S6tNn0',
  })
  refresh_token: string | null;
}
