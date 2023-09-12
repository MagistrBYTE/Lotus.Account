import { IImageSource, TImageSourceCategory } from '../domain/ImageSource'

/**
 * Класс базы данных для всех локальных изображений
 */
class ImageDatabaseClass
{
  private static _ImageDatabase: ImageDatabaseClass;

  public static get Instance(): ImageDatabaseClass 
  {
    return (this._ImageDatabase || (this._ImageDatabase = new this()));
  }

  /**
   * Список аватаров изображений
   */
  public avatars:IImageSource[] = [];

  constructor()
  {
    this.InitAvatars();
    this.getAllImages = this.getAllImages.bind(this);
    this.getImageById = this.getImageById.bind(this);
  }

  private InitAvatars()
  {
    this.avatars =  
    [
      {	
        id: 0,
        name: 'administrator',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_administrator_32.png'
      },
      {	
        id: 1,
        name: 'alien',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_alien_32.png'
      },
      {	
        id: 2,
        name: 'angel',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_angel_32.png'
      },
      {	
        id: 3,
        name: 'angel_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_angel_black_32.png'
      },
      {	
        id: 4,
        name: 'angel_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_angel_female_32.png'
      },
      {	
        id: 5,
        name: 'angel_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_angel_female_black_32.png'
      },
      {	
        id: 6,
        name: 'angelessa',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_angelessa_32.png'
      },
      {	
        id: 7,
        name: 'astronaut',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_astronaut_32.png'
      },
      {	
        id: 8,
        name: 'ballplayer',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_ballplayer_32.png'
      },
      {	
        id: 9,
        name: 'ballplayer_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_ballplayer_black_32.png'
      },
      {	
        id: 10,
        name: 'banker',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_banker_32.png'
      },
      {	
        id: 11,
        name: 'bart',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_bart_32.png'
      },
      {	
        id: 12,
        name: 'batman',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_batman_32.png'
      },
      {	
        id: 13,
        name: 'beach_lifeguard',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_beach_lifeguard_32.png'
      },
      {	
        id: 14,
        name: 'beach_lifeguard_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_beach_lifeguard_female_32.png'
      },
      {	
        id: 15,
        name: 'bender',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_bender_32.png'
      },
      {	
        id: 16,
        name: 'bishop',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_bishop_32.png'
      },
      {	
        id: 17,
        name: 'blondy',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_blondy_32.png'
      },
      {	
        id: 18,
        name: 'boxer',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_boxer_32.png'
      },
      {	
        id: 19,
        name: 'boxer_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_boxer_black_32.png'
      },
      {	
        id: 20,
        name: 'buddhist',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_buddhist_32.png'
      },
      {	
        id: 21,
        name: 'c3po',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_c3po_32.png'
      },
      {	
        id: 22,
        name: 'catwomen',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_catwomen_32.png'
      },
      {	
        id: 23,
        name: 'ceo',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_ceo_32.png'
      },
      {	
        id: 24,
        name: 'chief',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_chief_32.png'
      },
      {	
        id: 25,
        name: 'chief_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_chief_black_32.png'
      },
      {	
        id: 26,
        name: 'chief_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_chief_female_32.png'
      },
      {	
        id: 27,
        name: 'chief_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_chief_female_black_32.png'
      },
      {	
        id: 28,
        name: 'clown',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_clown_32.png'
      },
      {	
        id: 29,
        name: 'comment',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_comment_32.png'
      },
      {	
        id: 30,
        name: 'cook',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_cook_32.png'
      },
      {	
        id: 31,
        name: 'cook_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_cook_black_32.png'
      },
      {	
        id: 32,
        name: 'cook_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_cook_female_32.png'
      },
      {	
        id: 33,
        name: 'cook_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_cook_female_black_32.png'
      },
      {	
        id: 34,
        name: 'cowboy',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_cowboy_32.png'
      },
      {	
        id: 35,
        name: 'cowboy_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_cowboy_female_32.png'
      },
      {	
        id: 36,
        name: 'crabs',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_crabs_32.png'
      },
      {	
        id: 37,
        name: 'darth_vader',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_darth_vader_32.png'
      },
      {	
        id: 38,
        name: 'death',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_death_32.png'
      },
      {	
        id: 39,
        name: 'default',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_default_32.png'
      },
      {	
        id: 40,
        name: 'delete',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_delete_32.png'
      },
      {	
        id: 41,
        name: 'detective',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_detective_32.png'
      },
      {	
        id: 42,
        name: 'detective_gray',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_detective_gray_32.png'
      },
      {	
        id: 43,
        name: 'devil',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_devil_32.png'
      },
      {	
        id: 44,
        name: 'diver',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_diver_32.png'
      },
      {	
        id: 45,
        name: 'dracula',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_dracula_32.png'
      },
      {	
        id: 46,
        name: 'edit',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_edit_32.png'
      },
      {	
        id: 47,
        name: 'egyptian',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_egyptian_32.png'
      },
      {	
        id: 48,
        name: 'egyptian_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_egyptian_female_32.png'
      },
      {	
        id: 49,
        name: 'emo',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_emo_32.png'
      },
      {	
        id: 50,
        name: 'eskimo',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_eskimo_32.png'
      },
      {	
        id: 51,
        name: 'eskimo_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_eskimo_female_32.png'
      },
      {	
        id: 52,
        name: 'female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_female_32.png'
      },
      {	
        id: 53,
        name: 'firefighter',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_firefighter_32.png'
      },
      {	
        id: 54,
        name: 'firefighter_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_firefighter_black_32.png'
      },
      {	
        id: 55,
        name: 'freddy',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_freddy_32.png'
      },
      {	
        id: 56,
        name: 'geisha',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_geisha_32.png'
      },
      {	
        id: 57,
        name: 'gladiator',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_gladiator_32.png'
      },
      {	
        id: 58,
        name: 'go',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_go_32.png'
      },
      {	
        id: 59,
        name: 'gomer',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_gomer_32.png'
      },
      {	
        id: 60,
        name: 'goth',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_goth_32.png'
      },
      {	
        id: 61,
        name: 'gray',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_gray_32.png'
      },
      {	
        id: 62,
        name: 'green',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_green_32.png'
      },
      {	
        id: 63,
        name: 'halk',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_halk_32.png'
      },
      {	
        id: 64,
        name: 'hendrix',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_hendrix_32.png'
      },
      {	
        id: 65,
        name: 'imprisoned',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_imprisoned_32.png'
      },
      {	
        id: 66,
        name: 'imprisoned_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_imprisoned_black_32.png'
      },
      {	
        id: 67,
        name: 'imprisoned_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_imprisoned_female_32.png'
      },
      {	
        id: 68,
        name: 'imprisoned_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_imprisoned_female_black_32.png'
      },
      {	
        id: 69,
        name: 'indian',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_indian_32.png'
      },
      {	
        id: 70,
        name: 'indian_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_indian_female_32.png'
      },
      {	
        id: 71,
        name: 'ironman',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_ironman_32.png'
      },
      {	
        id: 72,
        name: 'jason',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_jason_32.png'
      },
      {	
        id: 73,
        name: 'jawa',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_jawa_32.png'
      },
      {	
        id: 74,
        name: 'jester',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_jester_32.png'
      },
      {	
        id: 75,
        name: 'jew',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_jew_32.png'
      },
      {	
        id: 76,
        name: 'judge',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_judge_32.png'
      },
      {	
        id: 77,
        name: 'judge_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_judge_black_32.png'
      },
      {	
        id: 78,
        name: 'king',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_king_32.png'
      },
      {	
        id: 79,
        name: 'king_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_king_black_32.png'
      },
      {	
        id: 80,
        name: 'knight',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_knight_32.png'
      },
      {	
        id: 81,
        name: 'leprechaun',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_leprechaun_32.png'
      },
      {	
        id: 82,
        name: 'lisa',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_lisa_32.png'
      },
      {	
        id: 83,
        name: 'maid',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_maid_32.png'
      },
      {	
        id: 84,
        name: 'medical',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_medical_32.png'
      },
      {	
        id: 85,
        name: 'medical_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_medical_black_32.png'
      },
      {	
        id: 86,
        name: 'medical_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_medical_female_32.png'
      },
      {	
        id: 87,
        name: 'medical_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_medical_female_black_32.png'
      },
      {	
        id: 88,
        name: 'mexican',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_mexican_32.png'
      },
      {	
        id: 89,
        name: 'muslim',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_muslim_32.png'
      },
      {	
        id: 90,
        name: 'muslim_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_muslim_female_32.png'
      },
      {	
        id: 91,
        name: 'ninja',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_ninja_32.png'
      },
      {	
        id: 92,
        name: 'nude',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_nude_32.png'
      },
      {	
        id: 93,
        name: 'nude_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_nude_black_32.png'
      },
      {	
        id: 94,
        name: 'nude_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_nude_female_32.png'
      },
      {	
        id: 95,
        name: 'nude_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_nude_female_black_32.png'
      },
      {	
        id: 96,
        name: 'nun',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_nun_32.png'
      },
      {	
        id: 97,
        name: 'nun_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_nun_black_32.png'
      },
      {	
        id: 98,
        name: 'officer',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_officer_32.png'
      },
      {	
        id: 99,
        name: 'officer_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_officer_black_32.png'
      },
      {	
        id: 100,
        name: 'oldman',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_oldman_32.png'
      },
      {	
        id: 101,
        name: 'oldman_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_oldman_black_32.png'
      },
      {	
        id: 102,
        name: 'oldwoman',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_oldwoman_32.png'
      },
      {	
        id: 103,
        name: 'oldwoman_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_oldwoman_black_32.png'
      },
      {	
        id: 104,
        name: 'orange',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_orange_32.png'
      },
      {	
        id: 105,
        name: 'patrick',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_patrick_32.png'
      },
      {	
        id: 106,
        name: 'pilot',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_pilot_32.png'
      },
      {	
        id: 107,
        name: 'pilot_civil',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_pilot_civil_32.png'
      },
      {	
        id: 108,
        name: 'pirate',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_pirate_32.png'
      },
      {	
        id: 109,
        name: 'plankton',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_plankton_32.png'
      },
      {	
        id: 110,
        name: 'police_england',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_police_england_32.png'
      },
      {	
        id: 111,
        name: 'police_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_police_female_32.png'
      },
      {	
        id: 112,
        name: 'police_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_police_female_black_32.png'
      },
      {	
        id: 113,
        name: 'policeman',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_policeman_32.png'
      },
      {	
        id: 114,
        name: 'policeman_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_policeman_black_32.png'
      },
      {	
        id: 115,
        name: 'priest',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_priest_32.png'
      },
      {	
        id: 116,
        name: 'priest_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_priest_black_32.png'
      },
      {	
        id: 117,
        name: 'pumpkin',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_pumpkin_32.png'
      },
      {	
        id: 118,
        name: 'queen',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_queen_32.png'
      },
      {	
        id: 119,
        name: 'queen_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_queen_black_32.png'
      },
      {	
        id: 120,
        name: 'r2d2',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_r2d2_32.png'
      },
      {	
        id: 121,
        name: 'racer',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_racer_32.png'
      },
      {	
        id: 122,
        name: 'rambo',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_rambo_32.png'
      },
      {	
        id: 123,
        name: 'red',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_red_32.png'
      },
      {	
        id: 124,
        name: 'redskin',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_redskin_32.png'
      },
      {	
        id: 125,
        name: 'robocop',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_robocop_32.png'
      },
      {	
        id: 126,
        name: 'sailor',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_sailor_32.png'
      },
      {	
        id: 127,
        name: 'sailor_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_sailor_black_32.png'
      },
      {	
        id: 128,
        name: 'samurai',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_samurai_32.png'
      },
      {	
        id: 129,
        name: 'scream',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_scream_32.png'
      },
      {	
        id: 130,
        name: 'silhouette',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_silhouette_32.png'
      },
      {	
        id: 131,
        name: 'soldier',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_soldier_32.png'
      },
      {	
        id: 132,
        name: 'spiderman',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_spiderman_32.png'
      },
      {	
        id: 133,
        name: 'sponge_bob',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_sponge_bob_32.png'
      },
      {	
        id: 134,
        name: 'squidward',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_squidward_32.png'
      },
      {	
        id: 135,
        name: 'stewardess',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_stewardess_32.png'
      },
      {	
        id: 136,
        name: 'stewardess_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_stewardess_black_32.png'
      },
      {	
        id: 137,
        name: 'striper',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_striper_32.png'
      },
      {	
        id: 138,
        name: 'striper_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_striper_black_32.png'
      },
      {	
        id: 139,
        name: 'student',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_student_32.png'
      },
      {	
        id: 140,
        name: 'student_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_student_black_32.png'
      },
      {	
        id: 141,
        name: 'student_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_student_female_32.png'
      },
      {	
        id: 142,
        name: 'student_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_student_female_black_32.png'
      },
      {	
        id: 143,
        name: 'suit',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_suit_32.png'
      },
      {	
        id: 144,
        name: 'superman',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_superman_32.png'
      },
      {	
        id: 145,
        name: 'swimmer',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_swimmer_32.png'
      },
      {	
        id: 146,
        name: 'swimmer_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_swimmer_black_32.png'
      },
      {	
        id: 147,
        name: 'swimmer_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_swimmer_female_32.png'
      },
      {	
        id: 148,
        name: 'trooper',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_trooper_32.png'
      },
      {	
        id: 149,
        name: 'trooper_captain',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_trooper_captain_32.png'
      },
      {	
        id: 150,
        name: 'vietnamese',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_vietnamese_32.png'
      },
      {	
        id: 151,
        name: 'vietnamese_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_vietnamese_female_32.png'
      },
      {	
        id: 152,
        name: 'viking',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_viking_32.png'
      },
      {	
        id: 153,
        name: 'viking_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_viking_female_32.png'
      },
      {	
        id: 154,
        name: 'waiter',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_waiter_32.png'
      },
      {	
        id: 155,
        name: 'waiter_female',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_waiter_female_32.png'
      },
      {	
        id: 156,
        name: 'waiter_female_black',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_waiter_female_black_32.png'
      },
      {	
        id: 157,
        name: 'wicket',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_wicket_32.png'
      },
      {	
        id: 158,
        name: 'yoda',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_yoda_32.png'
      },
      {	
        id: 159,
        name: 'zorro',
        category: TImageSourceCategory.Avatar,
        source: 'images/Avatar/Fatcow_user_zorro_32.png'
      }    
    ];
  }

  /**
   * Получить список всех локальных изображений
   * @returns 
   */
  public getAllImages():IImageSource[]
  {
    return [...this.avatars];
  }

  public getImageById(id?: number):IImageSource|undefined
  {
    if(id)
    {
      const image:IImageSource|undefined = this.avatars.find(x => x.id === id);
      return image;
    }

    // eslint-disable-next-line consistent-return
    return undefined;
  }
}

/**
 * Глобальный экземпляр базы данных для всех локальных изображений
 */
export const ImageDatabase = ImageDatabaseClass.Instance;

