export interface Store {
  id?:string;
  user_id?: string;
  displayname?: string;
  bio?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  youtube?: string;
  website?: string;
  pinterest?: string;
  linkedin?: string;
  x?: string;
  spotify?: string;
  applePodcast?: string;
  etsy?: string;
  discord?: string;
  snapchat?: string;
  twitch?: string;
  vimeo?: string;
  profilePicture?: string;
  created_at?: string;
}

export interface MyProfile {
  id: string;
  created_at?: string;
  user_id?: string;
  name: string;
  displayname: string;
  email: string;
  phonenumber: string;
}

export interface SocialMediaLinks {
  email: string;
  facebook: string;
  youtube: string;
  website: string;
  pinterest: string;
  linkedin: string;
  x: string;
  spotify: string;
  applePodcast: string;
  etsy: string;
  discord: string;
  snapchat: string;
  twitch: string;
  vimeo: string;
}

export interface SocialMediaProps {
  instagram: string;
  tiktok: string;
  socialLinks: SocialMediaLinks;
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
}
