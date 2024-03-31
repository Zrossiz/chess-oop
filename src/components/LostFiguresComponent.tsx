import { Figure } from "../models/figure/Figure";

interface LostFigursComponentProps {
    title: string;
    figures: Figure[];
}

export const LostFiguresComponent = ({ title, figures }: LostFigursComponentProps) => {
    return (
        <div className="lost">
            <h3>{title}</h3>
            {figures.map(figure => {
                return (
                    <div key={figure.id}>
                        {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} />}
                    </div>
                )
            })}
        </div>
    );
};