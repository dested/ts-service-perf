import {z} from 'zod';
const User1 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  strings: z.array(z.object({value: z.string()})),
});
const User2 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User1,
  strings: z.array(z.object({value: z.string()})),
});
const User3 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User2,
  strings: z.array(z.object({value: z.string()})),
});
const User4 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User3,
  strings: z.array(z.object({value: z.string()})),
});
const User5 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User4,
  strings: z.array(z.object({value: z.string()})),
});
const User6 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User5,
  strings: z.array(z.object({value: z.string()})),
});
const User7 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User6,
  strings: z.array(z.object({value: z.string()})),
});
const User8 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User7,
  strings: z.array(z.object({value: z.string()})),
});
const User9 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User8,
  strings: z.array(z.object({value: z.string()})),
});
const User10 = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  user: User9,
  strings: z.array(z.object({value: z.string()})),
});

type b = z.infer<typeof User10>;

type m = b['user']['user']['user']['user']['user']['user']['user']['user']['user']['location'][''];
