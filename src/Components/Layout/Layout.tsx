import { Header, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import React from "react";

// تعديل نوع الخصائص للمكون
const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(TitleProps) => <ThemedTitleV2 {...TitleProps} text="refine" />}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
