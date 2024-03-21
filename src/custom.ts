import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
export class CustomService {
  constructor(public readonly httpService: HttpService) {}

  async newLink(oldLink: string) {
    const response = this.httpService.post(
      `https://affiliate.shopee.vn/api/v3/gql`,
      {
        operationName: 'batchGetCustomLink',
        query:
          '\n    query batchGetCustomLink($linkParams: [CustomLinkParam!], $sourceCaller: SourceCaller){\n      batchCustomLink(linkParams: $linkParams, sourceCaller: $sourceCaller){\n        shortLink\n        longLink\n        failCode\n      }\n    }\n    ',
        variables: {
          linkParams: [
            {
              originalLink: oldLink,
              advancedLinkParams: {
                subId1: 'shopee',
                subId2: 'kol',
                subId3: '2024',
                subId4: '1ivr8z9zyg',
                subId5: 'phuong',
              },
            },
          ],
          sourceCaller: 'CUSTOM_LINK_CALLER',
        },
      },
      {
        headers: {
          Cookie:
            '_gcl_au=1.1.747719271.1708618377; _med=refer; _fbp=fb.1.1708618376790.655147262; SPC_F=j3Qij3UaxVqZBp4cuoIHhV25pQfnxQK7; REC_T_ID=45cb04a5-d19d-11ee-8672-c276d5c51f77; SPC_CLIENTID=ajNRaWozVWF4VnFabhiylefrbgngwuks; _med=affiliates; SC_DFP=gvMpvICokUCcRoHfODPWNldOQgPKpwBW; _gid=GA1.2.1453338189.1710607905; SPC_EC=.eTBpYWVQak5acFk3WWxNQZGggwrRR8J7xP15HV9GPPOerz3o+z7ZMQxLW8VA40Lok85zi2VcRaGd16PCNop/UvK6djE0gka4k0F9vgPhPVYkwE3WpNEYXMeVQwaFBuyW34JVENxEB/hdsGX4v2YomdlUNYiQnNcCvP67zEZTGjq7zpILUoAyvU6mSAVJzP0X++9LC6EpGKYtjjYk1bB0kA==; SPC_ST=.eTBpYWVQak5acFk3WWxNQZGggwrRR8J7xP15HV9GPPOerz3o+z7ZMQxLW8VA40Lok85zi2VcRaGd16PCNop/UvK6djE0gka4k0F9vgPhPVYkwE3WpNEYXMeVQwaFBuyW34JVENxEB/hdsGX4v2YomdlUNYiQnNcCvP67zEZTGjq7zpILUoAyvU6mSAVJzP0X++9LC6EpGKYtjjYk1bB0kA==; language=vi; link_social_media_641954921=1; SPC_U=641954921; SPC_SI=OxbwZQAAAABkd25hVmc0czeO0QAAAAAAeTNQOGZlWE8=; SPC_T_IV=N1BleFhlemdJcFNQdGlwVQ==; SPC_R_T_ID=gClEcMins+Awzr0PrMvo1TD3zciKhcR/+BT8FMTUDqcx4MHoRI1f0OrUtO2mkvJu3JcL8ET5abIgjQWOAZTatzCLTHY3JgRNwc6fBjXbFDiKcEc7mqgKQDQheXJgf9STaH6K0P6BhLqTIZyGVHlDcrIPd656cWJcCYr1biNq2vc=; SPC_R_T_IV=N1BleFhlemdJcFNQdGlwVQ==; SPC_T_ID=gClEcMins+Awzr0PrMvo1TD3zciKhcR/+BT8FMTUDqcx4MHoRI1f0OrUtO2mkvJu3JcL8ET5abIgjQWOAZTatzCLTHY3JgRNwc6fBjXbFDiKcEc7mqgKQDQheXJgf9STaH6K0P6BhLqTIZyGVHlDcrIPd656cWJcCYr1biNq2vc=; AMP_TOKEN=%24NOT_FOUND; _ga_4GPP1ZXG63=GS1.1.1710921102.11.1.1710921103.59.0.0; _ga=GA1.1.2061315329.1708618377; _ga_TEVYGNDY1K=GS1.1.1710921253.2.0.1710921254.59.0.0',
          'content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    const result = await lastValueFrom(
      response.pipe(map((response: any) => response)),
    );
    const res = {
      data: result.data,
    };
    return res.data.data.batchCustomLink[0].shortLink;
  }
}
