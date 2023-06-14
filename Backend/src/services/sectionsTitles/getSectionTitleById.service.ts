import SectionTitle from '../../models/sectionTitle.model';

export const getSectionTitleByIdService = async (id: string) => {
    try {
        const sectionTitle = await SectionTitle.findById(id);
        return sectionTitle;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while trying to get the sectionTitle.');
    }
}