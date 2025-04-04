function UserProfile({params}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>UserProfile</h1>
      <hr />
      <p>This is the Profile Page for User {params.id}</p>
    </div>
  );
}

export default UserProfile;
