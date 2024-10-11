export interface ComingSoonProps {
  page: string;
}

const ComingSoon = ({ page } : ComingSoonProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-fit">
      <h1 className="text-primary text-6xl">{page} Coming Soon!</h1>
      <h3 className="text-gray-400 text-3xl mt-10">Currently Being Worked On</h3>
    </div>
  )
}
export default ComingSoon