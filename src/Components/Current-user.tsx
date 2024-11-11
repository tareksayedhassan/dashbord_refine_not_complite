import { Popover, Button } from "antd";

const CurrentUser = () => {
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={<div>TEST</div>} // محتوى الـ Popover
      >
        <Button>Click me</Button> {/* زر لفتح الـ Popover */}
      </Popover>
    </>
  );
};

export default CurrentUser;
