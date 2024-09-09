import "./UserCard.css";

interface UserCardProps {
  name: string;
  age: number;
  isOnline: boolean;
}

const UserCard = (props: UserCardProps) => (
  <div className="user-card">
    <h2>{props.name}</h2>
    <p>Age: {props.age}</p>
    <p className={props.isOnline ? "user-card--online" : "user-card--offline"}>{props.isOnline ? "Online" : "Offline"}</p>
  </div>
);

export default UserCard;
