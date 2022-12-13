import {Aggregator, DocumentManager} from 'mongo-safe';
import {ObjectId} from 'mongodb';
import {unescape} from 'querystring';

async function main(){
  const lobbyResult = await Aggregator.start<DbLobbyModel>()
    .$match({
      active: true,
      public: true,
      'lobbyConfig.type': 'partyMode',
      'lobbyConfig.rules.genres': 'a',
      'lobbyConfig.rules.duration': 'b',
      'lobbyConfig.rules.gameJamId': 'c',
    })
    .$lookup({
      from: DbModels.lobbyUser.tableName,
      as: 'users',
      localField: '_id',
      foreignField: 'lobbyId',
    })
    .$unwind({path: '$users', preserveNullAndEmptyArrays: true})
    .$group({
      _iddeedededd: '$_id',
      usersCount: {$sum: 1},
      maxUserCount: {$first: '$maxUserCount'},
      lobbyCode: {$first: '$lobbyCode'},
    })
    .$sort({})
    .$limit(1)
    .result(await DbModels.lobby.getCollection());
}



export type DbLobbyModel = {
  _id: ObjectId;
  state: 'created' | 'starting' | 'playing';
  active: boolean;
  public: boolean;
  lobbyCode: string;
  countdownTimer: number;
  lobbyConfig: LobbyConfig;
  maxUserCount: number;
  minUserCount: number;

  gameIndex: number;
};

export type LobbyPartyModeConfig = {
  gameJamId?: string;
  genres: string;
  duration: 'short' | 'long';
};
export type LobbyConfig =
  | {
  type: 'partyMode';
  rules: LobbyPartyModeConfig;
}
  | {
  type: 'game';
};

export type DbLobbyUserModel = {
  _id: ObjectId;
  lobbyId: ObjectId;
  voteStart: boolean;
  userId: ObjectId;
  connectionId: string | null;
};

export class DbModels {
static lobby = new DocumentManager<DbLobbyModel>('lobby', ()=>undefined!);
  static lobbyUser = new DocumentManager<DbLobbyUserModel>('lobby-user', ()=>undefined!);

}
