import { ReactComponent as Spin } from "../../images/bigspin.svg";
import { ReactComponent as EmptyScreen } from "../../images/emptyScreen.svg";
import { ReactComponent as Edit } from "../../images/edit.svg";
import { ReactComponent as Check } from "../../images/check.svg";
import { ReactComponent as Plus } from "../../images/plus.svg";
import { ReactComponent as Leaf } from "../../images/leaf_1.svg";
import { ReactComponent as SplashLeaf } from "../../images/splashLeaf.svg";
import { ReactComponent as Title } from "../../images/Todos.svg";
import { ReactComponent as SplashTitle } from "../../images/splashTodos.svg";
import { ReactComponent as Search } from "../../images/search.svg";
import { ReactComponent as Delete } from "../../images/Vector.svg";
import { ReactComponent as Tick } from "../../images/tick.svg";

// Icon component
export const Icon = ({ src, className }) => {
  if (src === "Tick") return <Tick className={className} />;
  else if (src === "Spin") return <Spin className={className} />;
  else if (src === "Edit") return <Edit className={className} />;
  else if (src === "Check") return <Check className={className} />;
  else if (src === "Plus") return <Plus className={className} />;
  else if (src === "Leaf") return <Leaf className={className} />;
  else if (src === "SplashLeaf") return <SplashLeaf className={className} />;
  else if (src === "Title") return <Title className={className} />;
  else if (src === "SplashTitle") return <SplashTitle className={className} />;
  else if (src === "Search") return <Search className={className} />;
  else if (src === "Delete") return <Delete className={className} />;
  else return <EmptyScreen className={className} />;
};
