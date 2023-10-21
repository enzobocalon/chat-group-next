import MembersList from './MembersList';

export default function CurrentChatSidebar() {
  return (
    <>
      <h1 className="font-bold">FRONT-END DEVELOPERS</h1>
      <p className="text-base mt-6">
        Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis.
        In gravida mollis purus, at interdum arcu tempor non
      </p>
      <MembersList />
    </>
  );
}
