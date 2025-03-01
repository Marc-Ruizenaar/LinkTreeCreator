export interface Store {
  id?:string;
  user_id?: string;
  displayname?: string;
  bio?: string;
  profilePicture?: string;
  created_at?: string;
  socialmedia?: SocialArray[];
}

export interface MyProfile {
  id: string;
  created_at?: string;
  user_id?: string;
  name: string;
  username: string;
  email: string;
  phonenumber: string;
}

export interface SocialMediaLinksArray {
  social: SocialArray;
}

export interface SocialArray {
  icon: string;
  link: string;
  platform: string;
  secondaryIcon: string;
}


export interface SocialMediaProps {
  socialLinks: SocialArray[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Sections {
  id?: string;
  title?: string;
  subTitle?: string;
  buttonText?: string;
  buttonStyle?: number;
  href?: string;
  imageSrc?: string;
  position?: number;
  user_id?: string;
  created_at?: string;
  draft?: boolean;
}
