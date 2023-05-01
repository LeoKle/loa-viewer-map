import Condition from "../interfaces/condition.interface";

function groupConditionsByCop(
    conditions: Condition[]
  ): Record<string, Condition[]> {
    return conditions.reduce((acc, condition) => {
      const { cop } = condition;
      if (!acc[cop]) {
        acc[cop] = [];
      }
      acc[cop].push(condition);
      return acc;
    }, {} as Record<string, Condition[]>);
  }

  export default groupConditionsByCop