import {  Checkbox, FormControlLabel, FormGroup, List } from "@mui/material";

type SidebarProps = {
  category:any
};

export const Sidebar: React.FC<SidebarProps> = ({category}) => {
 

 const renderCategory=()=>{
  return category?.map((cat: { name: string })=>{
    return (
      <FormControlLabel control={<Checkbox defaultChecked />} label={cat.name} />
    )
  })
 }
 
  return (
    <List>
       <h2>Category</h2>
        <FormGroup>
          {renderCategory()}
        </FormGroup>
    </List>
  );
};
