import { Button } from "@aws-amplify/ui-react";
import "./MainGrid.css"
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export const MainGrid = () => {
  const [ attributes, setAttributes ] = useState<any>("")
  
  useEffect(() => {
    const test = async () => {
      const userAttributes = await fetchUserAttributes()
      setAttributes(userAttributes);
    }
    test()
  }, [])

  console.log(attributes);

  if (attributes == "") {
    return (
      <>LOADING PAGE</>
    )
  }

    return (
        <div className="main-grid">
          <div className="main-grid-header">
            <h2 className="grid-title">{attributes.preferred_username}'s Cards</h2>
            <Button
              loadingText=""
              onClick={() => alert('hello')}
              backgroundColor="green"
              color="white"
              borderColor="green"
            >
              New Card
            </Button>
          </div>
          <div className="grid-content">
            <div className="card">Card 1</div>
            <div className="card">Card 2</div>
            <div className="card">Card 3</div>
            <div className="card">Card 4</div>
          </div>
        </div>
      );

}