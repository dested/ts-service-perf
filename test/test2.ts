import {z} from 'zod';
const User = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  strings: z.array(z.object({value: z.string()})),
});

type b = z.infer<typeof User>;

type m = b['location'][''];
